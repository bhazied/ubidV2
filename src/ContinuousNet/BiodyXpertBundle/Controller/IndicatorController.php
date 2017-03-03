<?php

namespace ContinuousNet\BiodyXpertBundle\Controller;

use ContinuousNet\BiodyXpertBundle\Entity\Indicator;
use ContinuousNet\BiodyXpertBundle\Form\IndicatorType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Indicator Controller
 * 
 * Manage Indicators 
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
 * @see		IndicatorController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/indicator")
 */
class IndicatorController extends BaseController
{
	/**
	 * Lists all Indicator entities.
	 *
	 * @Route("/", name="indicator_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$indicators = $em->getRepository('BiodyXpertBundle:Indicator')->findAll();

		return $this->render('BiodyXpertBundle:Indicator:index.html.twig', array(
			'indicators' => $indicators,
		));
	}

	/**
	 * Creates a new Indicator entity.
	 *
	 * @Route("/new", name="indicator_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$indicator = new Indicator();
		$form = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\IndicatorType', $indicator);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($indicator);
			$em->flush();

			return $this->redirectToRoute('indicator_show', array('id' => $indicator->getId()));
		}

		return $this->render('BiodyXpertBundle:Indicator:new.html.twig', array(
			'indicator' => $indicator,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a Indicator entity.
	 *
	 * @Route("/{id}", name="indicator_show")
	 * @Method("GET")
	 */
	public function showAction(Indicator $indicator)
	{
		$deleteForm = $this->createDeleteForm($indicator);

		return $this->render('BiodyXpertBundle:Indicator:show.html.twig', array(
			'indicator' => $indicator,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing Indicator entity.
	 *
	 * @Route("/{id}/edit", name="indicator_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, Indicator $indicator)
	{
		$deleteForm = $this->createDeleteForm($indicator);
		$editForm = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\IndicatorType', $indicator);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($indicator);
			$em->flush();

			return $this->redirectToRoute('indicator_edit', array('id' => $indicator->getId()));
		}

		return $this->render('BiodyXpertBundle:Indicator:edit.html.twig', array(
			'indicator' => $indicator,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a Indicator entity.
	 *
	 * @Route("/{id}", name="indicator_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, Indicator $indicator)
	{
		$form = $this->createDeleteForm($indicator);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($indicator);
			$em->flush();
		}

		return $this->redirectToRoute('indicator_index');
	}

	/**
	 * Creates a form to delete a Indicator entity.
	 *
	 * @param Indicator $indicator The Indicator entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(Indicator $indicator)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('indicator_delete', array('id' => $indicator->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
