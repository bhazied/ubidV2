<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\BiddingType;
use ContinuousNet\UbidElectricityBundle\Form\BiddingTypeType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Bidding Type Controller
 * 
 * Manage BiddingTypes 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\UbidElectricityBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://ubidelectricity.continuousnet.com/ContinuousNet/UbidElectricityBundle/Controller
 * @see		BiddingTypeController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/biddingtype")
 */
class BiddingTypeController extends BaseController
{
	/**
	 * Lists all BiddingType entities.
	 *
	 * @Route("/", name="biddingtype_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$biddingTypes = $em->getRepository('UbidElectricityBundle:BiddingType')->findAll();

		return $this->render('UbidElectricityBundle:BiddingType:index.html.twig', array(
			'biddingTypes' => $biddingTypes,
		));
	}

	/**
	 * Creates a new BiddingType entity.
	 *
	 * @Route("/new", name="biddingtype_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$biddingType = new BiddingType();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\BiddingTypeType', $biddingType);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($biddingType);
			$em->flush();

			return $this->redirectToRoute('biddingtype_show', array('id' => $biddingType->getId()));
		}

		return $this->render('UbidElectricityBundle:BiddingType:new.html.twig', array(
			'biddingType' => $biddingType,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a BiddingType entity.
	 *
	 * @Route("/{id}", name="biddingtype_show")
	 * @Method("GET")
	 */
	public function showAction(BiddingType $biddingType)
	{
		$deleteForm = $this->createDeleteForm($biddingType);

		return $this->render('UbidElectricityBundle:BiddingType:show.html.twig', array(
			'biddingType' => $biddingType,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing BiddingType entity.
	 *
	 * @Route("/{id}/edit", name="biddingtype_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, BiddingType $biddingType)
	{
		$deleteForm = $this->createDeleteForm($biddingType);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\BiddingTypeType', $biddingType);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($biddingType);
			$em->flush();

			return $this->redirectToRoute('biddingtype_edit', array('id' => $biddingType->getId()));
		}

		return $this->render('UbidElectricityBundle:BiddingType:edit.html.twig', array(
			'biddingType' => $biddingType,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a BiddingType entity.
	 *
	 * @Route("/{id}", name="biddingtype_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, BiddingType $biddingType)
	{
		$form = $this->createDeleteForm($biddingType);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($biddingType);
			$em->flush();
		}

		return $this->redirectToRoute('biddingtype_index');
	}

	/**
	 * Creates a form to delete a BiddingType entity.
	 *
	 * @param BiddingType $biddingType The BiddingType entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(BiddingType $biddingType)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('biddingtype_delete', array('id' => $biddingType->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
