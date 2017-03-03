<?php

namespace ContinuousNet\BiodyXpertBundle\Controller;

use ContinuousNet\BiodyXpertBundle\Entity\IndicatorType;
use ContinuousNet\BiodyXpertBundle\Form\IndicatorTypeType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Indicator Type Controller
 * 
 * Manage IndicatorTypes 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\BiodyXpertBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://biodyxpert.continuousnet.com/ContinuousNet/BiodyXpertBundle/Controller
 * @see		IndicatorTypeController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/indicatortype")
 */
class IndicatorTypeController extends BaseController
{
	/**
	 * Lists all IndicatorType entities.
	 *
	 * @Route("/", name="indicatortype_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$indicatorTypes = $em->getRepository('BiodyXpertBundle:IndicatorType')->findAll();

		return $this->render('BiodyXpertBundle:IndicatorType:index.html.twig', array(
			'indicatorTypes' => $indicatorTypes,
		));
	}

	/**
	 * Creates a new IndicatorType entity.
	 *
	 * @Route("/new", name="indicatortype_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$indicatorType = new IndicatorType();
		$form = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\IndicatorTypeType', $indicatorType);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($indicatorType);
			$em->flush();

			return $this->redirectToRoute('indicatortype_show', array('id' => $indicatorType->getId()));
		}

		return $this->render('BiodyXpertBundle:IndicatorType:new.html.twig', array(
			'indicatorType' => $indicatorType,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a IndicatorType entity.
	 *
	 * @Route("/{id}", name="indicatortype_show")
	 * @Method("GET")
	 */
	public function showAction(IndicatorType $indicatorType)
	{
		$deleteForm = $this->createDeleteForm($indicatorType);

		return $this->render('BiodyXpertBundle:IndicatorType:show.html.twig', array(
			'indicatorType' => $indicatorType,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing IndicatorType entity.
	 *
	 * @Route("/{id}/edit", name="indicatortype_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, IndicatorType $indicatorType)
	{
		$deleteForm = $this->createDeleteForm($indicatorType);
		$editForm = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\IndicatorTypeType', $indicatorType);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($indicatorType);
			$em->flush();

			return $this->redirectToRoute('indicatortype_edit', array('id' => $indicatorType->getId()));
		}

		return $this->render('BiodyXpertBundle:IndicatorType:edit.html.twig', array(
			'indicatorType' => $indicatorType,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a IndicatorType entity.
	 *
	 * @Route("/{id}", name="indicatortype_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, IndicatorType $indicatorType)
	{
		$form = $this->createDeleteForm($indicatorType);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($indicatorType);
			$em->flush();
		}

		return $this->redirectToRoute('indicatortype_index');
	}

	/**
	 * Creates a form to delete a IndicatorType entity.
	 *
	 * @param IndicatorType $indicatorType The IndicatorType entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(IndicatorType $indicatorType)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('indicatortype_delete', array('id' => $indicatorType->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
