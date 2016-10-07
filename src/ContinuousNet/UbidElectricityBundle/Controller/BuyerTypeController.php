<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\BuyerType;
use ContinuousNet\UbidElectricityBundle\Form\BuyerTypeType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Buyer Type Controller
 * 
 * Manage BuyerTypes 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\UbidElectricityBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2016 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://ubidelectricity.continuousnet.com/ContinuousNet/UbidElectricityBundle/Controller
 * @see		BuyerTypeController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/buyertype")
 */
class BuyerTypeController extends BaseController
{
	/**
	 * Lists all BuyerType entities.
	 *
	 * @Route("/", name="buyertype_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$buyerTypes = $em->getRepository('UbidElectricityBundle:BuyerType')->findAll();

		return $this->render('UbidElectricityBundle:BuyerType:index.html.twig', array(
			'buyerTypes' => $buyerTypes,
		));
	}

	/**
	 * Creates a new BuyerType entity.
	 *
	 * @Route("/new", name="buyertype_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$buyerType = new BuyerType();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\BuyerTypeType', $buyerType);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($buyerType);
			$em->flush();

			return $this->redirectToRoute('buyertype_show', array('id' => $buyerType->getId()));
		}

		return $this->render('UbidElectricityBundle:BuyerType:new.html.twig', array(
			'buyerType' => $buyerType,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a BuyerType entity.
	 *
	 * @Route("/{id}", name="buyertype_show")
	 * @Method("GET")
	 */
	public function showAction(BuyerType $buyerType)
	{
		$deleteForm = $this->createDeleteForm($buyerType);

		return $this->render('UbidElectricityBundle:BuyerType:show.html.twig', array(
			'buyerType' => $buyerType,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing BuyerType entity.
	 *
	 * @Route("/{id}/edit", name="buyertype_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, BuyerType $buyerType)
	{
		$deleteForm = $this->createDeleteForm($buyerType);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\BuyerTypeType', $buyerType);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($buyerType);
			$em->flush();

			return $this->redirectToRoute('buyertype_edit', array('id' => $buyerType->getId()));
		}

		return $this->render('UbidElectricityBundle:BuyerType:edit.html.twig', array(
			'buyerType' => $buyerType,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a BuyerType entity.
	 *
	 * @Route("/{id}", name="buyertype_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, BuyerType $buyerType)
	{
		$form = $this->createDeleteForm($buyerType);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($buyerType);
			$em->flush();
		}

		return $this->redirectToRoute('buyertype_index');
	}

	/**
	 * Creates a form to delete a BuyerType entity.
	 *
	 * @param BuyerType $buyerType The BuyerType entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(BuyerType $buyerType)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('buyertype_delete', array('id' => $buyerType->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
